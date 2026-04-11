import { Router } from 'express';
import { 
  registerBuyer, 
  registerVendor, 
  login, 
  logout 
} from '../controllers/authController';

const router = Router();

router.post('/register/buyer', registerBuyer);
router.post('/register/vendor', registerVendor);
router.post('/login', login);
router.post('/logout', logout);

export default router;
