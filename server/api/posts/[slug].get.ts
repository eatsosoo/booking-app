import { getDB } from "../../db/mysql";

export default defineEventHandler(async (event) => {
  const db = getDB();
  try {
    const slug = getRouterParam(event, "slug");

    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: "Slug is required",
      });
    }

    const [rows]: any = await db.query(
      "SELECT * FROM posts WHERE slug = ? AND is_published = 1 LIMIT 1",
      [slug]
    );

    if (!rows.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found",
      });
    }

    return {
      data: rows[0],
    };
  } catch (error: any) {
    console.error("DB API error:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
