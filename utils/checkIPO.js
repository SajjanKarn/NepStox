import axios from "axios";

export const checkIPOAllotment = async (boid, company) => {
  const body = {
    boid,
    company,
  };
  try {
    const res = await axios.post(
      `https://wurfel.kitta.dev/checker`,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "sb-munqwdwzlbyqeelibers-auth-token=%5B%22eyJhbGciOiJIUzI1NiIsImtpZCI6InZTekQ5R3ZzdDRnbmZjNU8iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjkyNTQ2Njc3LCJpYXQiOjE2OTI1NDMwNzcsImlzcyI6Imh0dHBzOi8vbXVucXdkd3psYnlxZWVsaWJlcnMuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6Ijg2M2I4YjJjLTk2YTMtNDQxZi05NzQxLTM4ZTFmYTQ1NDlhZiIsImVtYWlsIjoia2FybmFhNzg3QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZXp2cFNjSHRwdk43Ymdzby1xUFBldEZrRmdRV0xUeWhDUGFwOE1ybE5RX1BnPXM5Ni1jIiwiZW1haWwiOiJrYXJuYWE3ODdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlNhamphbiBLYXJuYSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJTYWpqYW4gS2FybmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZXp2cFNjSHRwdk43Ymdzby1xUFBldEZrRmdRV0xUeWhDUGFwOE1ybE5RX1BnPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMDE0MjI5NjIwODM2MzYzNzExNTIiLCJzdWIiOiIxMDE0MjI5NjIwODM2MzYzNzExNTIifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTY5MjUzNDIxNX1dLCJzZXNzaW9uX2lkIjoiNTE3OTMxMWYtMTliYi00OGE4LTgzZjMtYzkwOWNmMGY0YWMzIn0.MUu-q4RZhuf59XTgVqw6maffPoBxQuw2spbwWAWw9r0%22%2C%22cFzrRVIN3KiGh59bH9q5WA%22%2Cnull%2Cnull%2Cnull%5D; Max-Age=31536000000;",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkIPOAllotmentMultiple = async (boids, company) => {
  console.log(boids);
  try {
    const arrayOfPromises = boids.map((boid) =>
      checkIPOAllotment(boid.boid, company)
    );
    const res = await Promise.all(arrayOfPromises);
    return res;
  } catch (error) {
    console.log(error);
  }
};
