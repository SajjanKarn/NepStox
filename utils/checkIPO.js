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
            "sb-munqwdwzlbyqeelibers-auth-token=%5B%22eyJhbGciOiJIUzI1NiIsImtpZCI6InZTekQ5R3ZzdDRnbmZjNU8iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjkyNzYzODc5LCJpYXQiOjE2OTI3NjAyNzksImlzcyI6Imh0dHBzOi8vbXVucXdkd3psYnlxZWVsaWJlcnMuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6Ijg2M2I4YjJjLTk2YTMtNDQxZi05NzQxLTM4ZTFmYTQ1NDlhZiIsImVtYWlsIjoia2FybmFhNzg3QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZXp2cFNjSHRwdk43Ymdzby1xUFBldEZrRmdRV0xUeWhDUGFwOE1ybE5RX1BnPXM5Ni1jIiwiZW1haWwiOiJrYXJuYWE3ODdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlNhamphbiBLYXJuYSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJTYWpqYW4gS2FybmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZXp2cFNjSHRwdk43Ymdzby1xUFBldEZrRmdRV0xUeWhDUGFwOE1ybE5RX1BnPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMDE0MjI5NjIwODM2MzYzNzExNTIiLCJzdWIiOiIxMDE0MjI5NjIwODM2MzYzNzExNTIifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTY5Mjc2MDI3OX1dLCJzZXNzaW9uX2lkIjoiNDRjMzgyYWYtMGUyMS00OTQ3LWI4MTctMTZkNGJkMmFhNDFmIn0.UZfrLRr8k8N1Leq28lNwEDBldAOa-k3w9fpC8kUNKJI%22%2C%22WZFF9VT75EigD7WuLaINvw%22%2C%22ya29.a0AfB_byAEb-qJyOX1EXjmwPGIglpd508WLklNG2ly6Uj402DocMVcWOMC_HAHfExzVcVYpluBijXPmhIQ0dhjzpaQznFNqxDBe_b9EusOIva5Sk1uNe9IxBQBF2_5NjhqLoFYfrimXt803MgCA8014zKshBy0istT0_LwR2gaCgYKAZUSARASFQHsvYls7fOAZDHO2yhjb04gRGFTFw0174%22%2Cnull%2Cnull%5D",
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
