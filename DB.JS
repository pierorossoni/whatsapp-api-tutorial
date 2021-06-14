const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
	connectionString: 'postgres://wjamendjvidgrg:651bba4708fa5f528cd5024f29fae566bfa10c0e15bab0ca0f5fb07e94ba6904@ec2-52-45-179-101.compute-1.amazonaws.com:5432/d14u0cv5osvint',
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