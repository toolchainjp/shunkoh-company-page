export async function onRequest(context) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = context.env;
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token, error } = await tokenRes.json();

  if (error || !access_token) {
    const message = `authorization:github:error:${JSON.stringify({ error: error || 'unknown' })}`;
    return respondWithScript(message);
  }

  const message = `authorization:github:success:${JSON.stringify({ token: access_token, provider: 'github' })}`;
  return respondWithScript(message);
}

function respondWithScript(message) {
  const html = `<!DOCTYPE html>
<html>
<body>
<script>
  (function () {
    window.opener.postMessage(${JSON.stringify(message)}, '*');
    window.close();
  })();
<\/script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
