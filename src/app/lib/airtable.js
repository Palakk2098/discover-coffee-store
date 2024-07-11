const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_KEY }).base(process.env.AIRTABLE_BASE_KEY);
const table = base("coffee-stores");

const getMinifiedRecords = (records) => {
    return records.map((record) => { return { ...record.fields,recordId:record.id } })
}

const getFilteredRecords = async (id) => {
    const result = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage();

    const records = getMinifiedRecords(result)
    return records

}

export { table, getMinifiedRecords ,getFilteredRecords}

