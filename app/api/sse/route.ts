declare global {
  // Augment the globalThis type to include latestSSEWriter
  var latestSSEWriter: WritableStreamDefaultWriter<Uint8Array> | undefined;
}

export async function GET() {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const send = (data: string) => {
    writer.write(encoder.encode(`data: ${data}\n\n`));
  };

  globalThis.latestSSEWriter = writer;
  send("connected");

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Encoding": "none",
    },
  });
}
