require('dotenv').config();
const pool = require('../lib/db');

module.exports = async (req, res) => {
  // 人家加了高级CORS设置喵~
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // 简单认证（可选喵）
  if (req.headers['api-key'] !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized喵！(╯‵□′)╯' });
  }

  try {
    const [rows] = await pool.query(`
      SELECT id, name, password 
      FROM login
      LIMIT 100  // 防止查询过大喵~
    `);
    
    res.status(200).json({
      success: true,
      data: rows.map(row => ({
        ...row,
        password: '***'  // 安全处理喵~
      }))
    });
    
  } catch (err) {
    console.error('数据库出错喵！', err);
    res.status(500).json({ 
      error: `Database error喵: ${err.message}`,
      solution: '检查阿里云白名单和SSL设置喵~'
    });
  }
};