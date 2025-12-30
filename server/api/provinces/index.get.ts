import { db } from "../../db/mysql";

export default defineEventHandler(async () => {
  const [rows] = await db.query(`
    SELECT
      p.id,
      p.name,
      p.slug,
      p.region,
      p.district,
      p.created_at,
      p.updated_at,
      pt.id AS property_type_id,
      pt.name AS property_type_name
    FROM provinces p
    JOIN property_type_province ptp
      ON p.id = ptp.province_id
    JOIN property_types pt
      ON pt.id = ptp.property_type_id
    ORDER BY p.id DESC
  `);

  // 👉 Group dữ liệu
  const map = new Map<number, any>();

  for (const row of rows as any[]) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        name: row.name,
        slug: row.slug,
        region: row.region,
        district: row.district,
        property_types: [],
        created_at: row.created_at,
        updated_at: row.updated_at,
      });
    }

    map.get(row.id).property_types.push({
      id: row.property_type_id,
      name: row.property_type_name,
    });
  }

  return { data: Array.from(map.values()) };
});
