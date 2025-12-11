import { Router } from 'express'
import { errCatcher } from '../../Middlewares/comon.middleware'
import { addStudentToSection, getSection, getSections } from './services/sections.services'

const SectionRouter = Router()

SectionRouter.get('/', errCatcher(getSections))
SectionRouter.post('/studentToSection', errCatcher(addStudentToSection))
SectionRouter.get('/getSection', errCatcher(getSection))

export { SectionRouter }
