const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
	connectionString: 'postgres://wogdwglpuivptj:be4538a10f348cf63bd1bb048492b93f61377e4254496b3e2b3a96179aed23af@ec2-18-214-140-149.compute-1.amazonaws.com:5432/d91oc7maghb3kq',
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