// Fails fast with a clear message when run on a Node version too old for Vite 8,
// instead of Vite's cryptic "does not provide an export named 'styleText'" error.
const [major, minor] = process.versions.node.split('.').map(Number);
const ok = major > 20 || (major === 20 && minor >= 19);

if (!ok) {
  console.error(`
  ✖ Node ${process.versions.node} is too old. This project needs Node 20.19+.

  Fix (in this terminal):
    source ~/.nvm/nvm.sh
    nvm use
    npm run dev

  Or simply open a NEW terminal window and run "npm run dev" again.
`);
  process.exit(1);
}
