const admin = require('../services/firebaseAdmin')

async function attachUserIfPresent(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return next(); // no user, continue

  try {
    const decoded = await admin.auth().verifyIdToken(token, true);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      isAdmin: !!decoded.admin,
    };
  } catch (_) {
    // ignore bad token for public routes; protected routes will still check
  }
  next();
}

function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorised' });
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Admin only' });
  next();
}

module.exports = { attachUserIfPresent, requireAuth, requireAdmin };