import express from 'express';
import {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  updateBoardStatus,
  deleteBoard,
} from '../controller/board.controller.js';

const router = express.Router();

router.post('/boards', createBoard);
router.get('/boards', getAllBoards);
router.get('/boards/:id', getBoardById);
router.put('/boards/:id', updateBoard);
router.patch('/boards/:id/status', updateBoardStatus);
router.delete('/boards/:id', deleteBoard);

export default router;
