interface MessageBody {
  attachments: string[];
  avatar_url: string | null;
  created_at: number;
  group_id: string;
  id: string;
  name: string;
  sender_id: string;
  sender_type: string;
  source_guid: string;
  system: boolean;
  text: string;
  user_id: string;
}

export async function getJSON(stream: ReadableStream<Uint8Array>): Promise<MessageBody> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(Buffer.from(value));
    }

    const bodyString = Buffer.concat(chunks).toString("utf-8");
    let body: MessageBody = JSON.parse(bodyString);

    return body;
  } catch (error) {
    console.error("Error reading stream or parsing JSON: ", error);
    throw error;
  } finally {
    reader.releaseLock();
  }
}
