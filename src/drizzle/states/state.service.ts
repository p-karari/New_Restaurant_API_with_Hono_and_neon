// service.ts
import { eq } from "drizzle-orm";
import db from "../db";
import { StateTable,TIStateTable, TSStateTable } from "../schema";

  
  // const states: TIStateTable = [
  //   { id: 4, name: "washington", code: 1215, city: "seattle" },
  //   { id: 5, name: "maryland", code: 52154, city: "washington DC" },
  //   { id: 6, name: "colorado", code: 5154, city: "nortsh town" },
  //   { id: 7, name: "utah", code: 66568, city: "utah town" },
  //   { id: 8, name: "georgia", code: 2215, city: "atlanta" },
  // ];
  
  export class StateService {
    async getAllStates(): Promise<TSStateTable[]> {
      return await db.query.StateTable.findMany();
    }
  
    async getStateById(id: number): Promise<TIStateTable | undefined> {
      const state = await db.query.StateTable.findFirst({ where: eq(StateTable.id, id) })
      return state;
    }
  
    async createState(state: TIStateTable): Promise<TIStateTable> {
      const [newState] = await db.insert(StateTable).values(state).returning();
      return newState;
    }
  
    async updateState(id: number, stateData: Partial<TIStateTable>): Promise<TIStateTable | null> {
      const [updatedState] = await db.update(StateTable)
      .set(stateData)
      .where(eq(StateTable.id, id))
      .returning();
      return updatedState;
    }
    async deleteState(id: number) {
      await db.delete(StateTable).where(eq(StateTable.id, id));
      return "State deleted successfully"
    }
  }

  