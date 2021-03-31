import { submitData, watchFileUploadText, watchInputText } from './submissionUI'
import {getInfo} from '../scripts/common/info-view'

getInfo();
submitData();
watchFileUploadText();
watchInputText();