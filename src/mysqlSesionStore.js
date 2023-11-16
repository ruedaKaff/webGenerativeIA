// mysqlSessionStore.js
// import { Store } from 'express-session';
// import { pool } from './common/connection.js';

// class MySQLSessionStore extends Store {
//   constructor(options) {
//     super(options);
//     this.pool = pool;
//   }

//   async get(sid, callback) {
//     try {
//       const [rows] = await this.pool.query('SELECT session_data FROM sessions WHERE session_id = ?', [sid]);
//       if (rows.length > 0) {
//         const session = JSON.parse(rows[0].session_data);
//         callback(null, session);
//       } else {
//         callback();
//       }
//     } catch (error) {
//       callback(error);
//     }
//   }

//   async set(sid, session, callback) {
//     try {
//       const sessionData = JSON.stringify(session);
//       await this.pool.query('REPLACE INTO sessions (session_id, session_data) VALUES (?, ?)', [sid, sessionData]);
//       callback(null);
//     } catch (error) {
//       callback(error);
//     }
//   }

//   async destroy(sid, callback) {
//     try {
//       await this.pool.query('DELETE FROM sessions WHERE session_id = ?', [sid]);
//       callback(null);
//     } catch (error) {
//       callback(error);
//     }
//   }
// }

// export  { MySQLSessionStore };
