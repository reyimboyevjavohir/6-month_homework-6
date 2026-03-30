import pool from '../config/db.js';

const allowedStatuses = ['tasks', 'pending', 'in_progress', 'done'];

const isValidStatus = (status) => allowedStatuses.includes(status);

export const createBoard = async (req, res) => {
  try {
    const { title, description = '', status = 'tasks' } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'title kiritilishi shart' });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        message: 'status noto‘g‘ri',
        allowedStatuses,
      });
    }

    const query = `
      INSERT INTO boards (title, description, status)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [title.trim(), description.trim(), status];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Task muvaffaqiyatli yaratildi',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

export const getAllBoards = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM boards ORDER BY id ASC');

    res.status(200).json({
      message: 'Barcha tasklar olindi',
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

export const getBoardById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM boards WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task topilmadi' });
    }

    res.status(200).json({
      message: 'Task topildi',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description = '', status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'title kiritilishi shart' });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        message: 'status noto‘g‘ri',
        allowedStatuses,
      });
    }

    const query = `
      UPDATE boards
      SET title = $1,
          description = $2,
          status = $3,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;

    const values = [title.trim(), description.trim(), status, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task topilmadi' });
    }

    res.status(200).json({
      message: 'Task muvaffaqiyatli yangilandi',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

export const updateBoardStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidStatus(status)) {
      return res.status(400).json({
        message: `status noto‘g‘ri`,
        allowedStatuses,
      });
    }

    const query = `
      UPDATE boards
      SET status = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task topilmadi' });
    }

    res.status(200).json({
      message: 'Task statusi yangilandi',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM boards WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task topilmadi' });
    }

    res.status(200).json({
      message: `Task muvaffaqiyatli o‘chirildi`,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
};

export { allowedStatuses };
