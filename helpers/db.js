const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
	connectionString: 'postgres://ltrermwgxhvbvl:7bd415982b7e60e456ef5d398f96fe6af9442316ff2b9628192d753778832870@ec2-34-195-143-54.compute-1.amazonaws.com:5432/d6kvv82nv8f9ds',
ssl: {
rejectUnauthorized: false
}
});

client.connect();

const readSession = async () => {
	try {
		const res = await client.query('SELECT * FROM wa_sessions ORDER BY created_at DESC LIMIT 1');
		if (res.rows.lenght) return res.rows[0].session;
		return '';
	} catch (err) {
		throw err;
	}
}

const saveSession = (session) => {
	client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, results) => {
		if(err) {
			console.error ('Failed to save session!', err);
		} else {
			console.log('Session saved!');
		}
	});
}

const removeSession = () => {
	client.query('DELETE FROM wa_sessions', (err, results) => {
		if (err) {
			console.error ('Failed to remove session!', err);
		} else {
			console.log ('Session deleted!');
		}
	});
}

module.exports = {
	readSession,
	saveSession,
	removeSession
}

// ESTRATÉGIA ZAP DAS GALÁXIAS
// ZDG © 2020
// www.zapdasgalaxias.com.br  
