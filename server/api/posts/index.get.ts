import { db } from "../../db/mysql";
import { getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search?.toString() || "";

    const offset = (page - 1) * limit;

    // WHERE condition
    let where = "";
    const params: any[] = [];

    if (search) {
      where = "WHERE title LIKE ?";
      params.push(`%${search}%`);
    }

    // Query list
    const [rows]: any = await db.query(
      `
      SELECT id, title, slug, image, description, created_at
      FROM posts
      ${where}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    // Query total
    const [[{ total }]]: any = await db.query(
      `
      SELECT COUNT(*) as total
      FROM posts
      ${where}
      `,
      params
    );

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("API /posts error:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
