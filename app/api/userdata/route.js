// /app/api/get-user-data/route.js
export async function GET(req) {
  try {
    // Hardcoded admin credentials (You can replace this with a database query)
    const adminCredentials = {
      username: 'adminhhsjune2025',
      password: 'e&a*JbDt',
    };

    return new Response(JSON.stringify(adminCredentials), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch user data' }),
      { status: 500 }
    );
  }
}
