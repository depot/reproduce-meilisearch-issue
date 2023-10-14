const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  let ready = false;

  while (!ready) {
    try {
      const res = await fetch("http://localhost:7700/health", {
        headers: { authorization: `Bearer ${process.env.MASTER_KEY}` },
      });
      const json = await res.json();
      console.log(json);
      ready = (json as { status: string }).status === "available";
    } catch (err: any) {
      console.log(`Server not ready yet: ${err}`);
      await sleep(1000);
    }
  }

  console.log("Server is ready");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
