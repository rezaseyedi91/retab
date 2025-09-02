import { PrismaClient } from "@prisma/client";

export default class DB {
    static instance: PrismaClient
    static getInstance() {
        if (!this.instance) {
            this.instance = new PrismaClient();
            this.checkConnection()
        }
        return this.instance
    }

    private static async  checkConnection() {
        try {
            const result = await this.instance.$connect();
            
        } catch (error) {
            console.log('not Connected!');
            
        }
    }
} 