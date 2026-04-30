export async function onRequest(context) {
  const { GITHUB_CLIENT_ID } = context.env;
  const origin = new URL(context.request.url).origin;
  const redirectUri = `${origin}/api/callback`;

  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  githubUrl.searchParams.set('redirect_uri', redirectUri);
  githubUrl.searchParams.set('scope', 'repo');

  return Response.redirect(githubUrl.toString(), 302);
}
