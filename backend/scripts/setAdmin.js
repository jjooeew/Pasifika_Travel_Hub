// backend/scripts/setAdmin.js
// Usage:
//   node scripts/setAdmin.js --uid <UID> --enable
//   node scripts/setAdmin.js --uid <UID> --disable
//   node scripts/setAdmin.js --email <EMAIL> --enable
//
// Requires: backend/serviceAccount.json (or FIREBASE_SERVICE_ACCOUNT env var)

const path = require('path');
const admin = require('firebase-admin');

function initAdmin() {
  if (admin.apps.length) return;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({ credential: admin.credential.cert(creds) });
  } else {
    const sa = require(path.join(__dirname, '..', 'serviceAccount.json'));
    admin.initializeApp({ credential: admin.credential.cert(sa) });
  }
}

async function setAdminByUid(uid, enable) {
  const claims = enable ? { admin: true } : { admin: admin.delete }; // delete removes the claim
  // Read existing claims so we don’t nuke others:
  const user = await admin.auth().getUser(uid);
  const current = user.customClaims || {};
  if (enable) current.admin = true; else delete current.admin;

  await admin.auth().setCustomUserClaims(uid, current);
  // Optional: revoke tokens so the user must refresh/sign-in again
  await admin.auth().revokeRefreshTokens(uid);
  console.log(`OK: ${enable ? 'Enabled' : 'Disabled'} admin for ${uid}`);
}

async function setAdminByEmail(email, enable) {
  const user = await admin.auth().getUserByEmail(email);
  return setAdminByUid(user.uid, enable);
}

(async () => {
  try {
    initAdmin();

    const args = process.argv.slice(2);
    const enable = args.includes('--enable');
    const disable = args.includes('--disable');
    const uidIdx = args.indexOf('--uid');
    const emailIdx = args.indexOf('--email');

    if (!(enable ^ disable)) {
      throw new Error('Specify exactly one of --enable or --disable');
    }

    if (uidIdx !== -1) {
      const uid = args[uidIdx + 1];
      if (!uid) throw new Error('Missing UID value after --uid');
      await setAdminByUid(uid, enable);
    } else if (emailIdx !== -1) {
      const email = args[emailIdx + 1];
      if (!email) throw new Error('Missing email value after --email');
      await setAdminByEmail(email, enable);
    } else {
      throw new Error('Provide --uid <UID> or --email <EMAIL>');
    }
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
