import fs from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { dir: string[] } }
) {
  const filePath = path.join(process.cwd(), "public", params.dir.join("/"));

  try {
    const data = await fs.readFile(filePath);
    return new Response(data, { status: 200 });
  } catch (error) {
    if (!(error instanceof Error)) {
      return Response.json(
        { error: "Failed to read file" },
        {
          status: 500,
        }
      );
    }

    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return Response.json(
        { error: "File not found" },
        {
          status: 404,
        }
      );
    } else {
      return Response.json(
        { error: "Failed to read file" },
        {
          status: 500,
        }
      );
    }
  }
}
