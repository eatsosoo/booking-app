import { getDB } from "../../db/mysql";
import { getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const db = getDB();

  try {
    const query = getQuery(event);
    const search = query.search?.toString() || "";

    // WHERE condition
    let where = "";
    const params: any[] = [];

    if (search) {
      where = "WHERE setting_key LIKE ?";
      params.push(`%${search}%`);
    }

    // Query list
    const [rows]: any = await db.query(
      `
      SELECT id, setting_key, setting_value
      FROM settings
      ${where}
      ORDER BY id DESC
      `,
      [...params]
    );

    return {
      data: rows,
    };
  } catch (error) {
    console.error("API /settings error:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
