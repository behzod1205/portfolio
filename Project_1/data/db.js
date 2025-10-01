import fs from "node:fs/promises"

const dbPath = new URL("./db.json", import.meta.url)

async function readDB() {
    try {
        const data = await fs.readFile(dbPath, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        throw error
    }
}

async function writeDB(data) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2))
}

export const db = { readDB, writeDB }       