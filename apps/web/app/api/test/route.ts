import {db} from "@repo/db"
// 
export async function GET() {
  const users = await db.user.findMany();
  return Response.json(users);
}