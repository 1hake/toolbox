import { promises as fs } from "fs";
import path from "path";

// Get the file path of bookmarks.json
const filePath = path.join(process.cwd(), "public", "bookmarks.json");

async function ensureFileExists() {
  try {
    await fs.access(filePath);
  } catch (error) {
    // If the file does not exist, create it with an empty array
    await fs.writeFile(filePath, JSON.stringify([]));
  }
}

export async function GET(request) {
  try {
    await ensureFileExists();
    const data = await fs.readFile(filePath, "utf8");
    const bookmarks = JSON.parse(data);
    console.log("🚀 ~ GET ~ bookmarks:", bookmarks);
    return new Response(JSON.stringify(bookmarks), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error reading bookmarks file:", error);
    return new Response(
      JSON.stringify({ error: "Failed to read bookmarks file" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    await ensureFileExists();
    const { name, url } = await request.json();

    if (!name || !url) {
      return new Response(JSON.stringify({ error: "Missing name or url" }), {
        status: 400,
      });
    }

    const data = await fs.readFile(filePath, "utf8");
    const bookmarks = JSON.parse(data);

    const newBookmark = {
      id: bookmarks.length + 1,
      name,
      url,
    };

    bookmarks.push(newBookmark);

    await fs.writeFile(filePath, JSON.stringify(bookmarks, null, 2));

    return new Response(JSON.stringify(newBookmark), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error writing to bookmarks file:", error);
    return new Response(
      JSON.stringify({ error: "Failed to write to bookmarks file" }),
      {
        status: 500,
      }
    );
  }
}
