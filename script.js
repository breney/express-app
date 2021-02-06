
const { MongoClient } = require('mongodb')

const faker = require('faker')

const _ = require("lodash")

const ObjectID = require('mongodb').ObjectID;

faker.locale = "pt_BR"

async function main() {

    const client = new MongoClient('mongodb://localhost:27017',{ useUnifiedTopology: true });
 
    try {
        // Connect to the MongoDB
        await client.connect();
		let db = client.db('library_db');
 
 
		//Inserção de 10 dados na collection books 
		let booksIds = await db.collection('books').insertMany(
			_.times(10, () => {
				return {
					"name": faker.name.findName(),
					"isbn": faker.random.uuid(),
					"edition": faker.random.number(),
					"author": {
						"_id" : new ObjectID(),
						"name": faker.name.firstName(),
						"nationality": faker.address.country(),
					},
					"publisher": {
						"_id" : new ObjectID(),
						"name": faker.name.findName(),
						"address": faker.address.streetAddress(),
						"phone": faker.phone.phoneNumber(),
					}
				}
			})
		).then((res) => _.values(res.insertedIds));
		
		console.log('Books Inserted');
		
		
		//Inserção de 10 dados na collection customers 
		let customersIds = await db.collection('customers').insertMany(
			_.times(10, () => {
				return {
					"name": faker.name.findName(),
					"address": faker.random.uuid(),
					"phone": faker.phone.phoneNumber(),
					"age": faker.random.number(),
				}
			})
		).then((res) => _.values(res.insertedIds));
		
		console.log('Customers Inserted');
		
		//Inserção de 10 dados na collection requests 
		await db.collection('requests').insertMany(
			_.times(10, () => {
				return {
					"data_begin": faker.date.recent(),
					"data_end": faker.date.recent(),
					"books": _.sampleSize(booksIds, Math.floor(Math.random() * 10)),
					"customer_id": _.sample(customersIds),
					"librarian": {
						"name": faker.name.findName(),
						"address": faker.address.streetAddress(),
						"phone": faker.phone.phoneNumber(),
						"schedule": faker.date.recent(),
					},
				}
			})
		).then()
		
		console.log('Requests Inserted');

		
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

