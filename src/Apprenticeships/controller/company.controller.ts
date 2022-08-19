import { Controller, Delete, Get, Post, Put, UseInterceptors , Res, UploadedFile, UploadedFiles } from '@nestjs/common';
import { Body,Param,Response } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CompanyEntity } from '../entities/company.entity';
import { InternshipNewsEntity } from '../entities/internshipNews.entity';
import { RecruitingEntity } from '../entities/recruiting.enity';
import { CompanyService } from '../service/company.service';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';


@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService){}

  @Post('/add')
  create(@Body() news: InternshipNewsEntity): Promise<InternshipNewsEntity> {
    return this.companyService.createNews(news);
  }

  @Get('/getAllNews')
  async findAll(): Promise<InternshipNewsEntity[]> {
    return this.companyService.findAllNews();
  }

  @Get('/getNewsById/:id')
  async findOne(@Param('id') id) {
  return this.companyService.findOneNews(id);

}
@Get('/getAllCompanyStaff')
async findAllCompanyStaff(): Promise<CompanyEntity[]> {
  return this.companyService.findAllCompanyStaff();
}

@Get('/getCompanyStaffById/:id')
async findOneCompanyStaff(@Param('id') id) {
return this.companyService.findOneCompanyStaff(id);

}

//   @Put('/update/:id')
//   async update(@Param('id') id, @Body() user: UserEntity): Promise<any>{
//     user.userId = Number(id)
//     return this.userService.update(user);
//   }

  @Delete('/delete/:id')
  async delete(@Param('id') id): Promise<any> {
    return this.companyService.deleteNews(id);
  }

  @Post('/cnstaff')
  createCnstaff(@Body() cnstaff: CompanyEntity): Promise<CompanyEntity> {
    return this.companyService.createCompanyStaff(cnstaff);
  }
  @Post('/createrecruit')
  createRecruiting(@Body() recruiting: RecruitingEntity): Promise<RecruitingEntity> {
    return this.companyService.createRecruiting(recruiting);
  }
  @Put('/updateRec/:id')
  async update(@Param('id') id:string, @Body() recruiting: RecruitingEntity): Promise<any>{
    recruiting.recruitId = id
    return this.companyService.updateRecruiting(recruiting);
  }
  @Delete('/deleteRecru/:id')
  async deleteRecruiting(@Param('id') id): Promise<any> {
    return this.companyService.deleteRecruiting(id);
  }
  @Get('/getAllRecruit')
  async findAllRecruit(): Promise<RecruitingEntity[]> {
    return this.companyService.findAllRecruit();
  }

  @Get('/getRecruitById/:id')
  async findOneRecruit(@Param('id') id) {
  return this.companyService.findOneRecruit(id);
}
@Post('/uploadOne/:id')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
)
async uploadedFile(@UploadedFile() file,@Param('id') id, 
compic:CompanyEntity): Promise<any> {
  const response = {
    originalname: file.originalname,
    filename: file.filename,
  }
  let image = response.filename
  console.log(image)
this.companyService.customQuery(image,id)
  return response;
}

@Post('multiple')
@UseInterceptors(
  FilesInterceptor('image', 20, {
    storage: diskStorage({
      destination: './files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),
)
async uploadMultipleFiles(@UploadedFiles() files) {
  const response = [];
  files.forEach(file => {
    const fileReponse = {
      originalname: file.originalname,
      filename: file.filename,
    };
    response.push(fileReponse);
  });
  return response;
}

@Post('/login')
async login(@Body() req:any,@Response({passthrough: true}) response: Response) {
return this.companyService.login(req,response);
}  
@Post('/logout')
async logout(@Response({passthrough: true}) response: Response) {
return this.companyService.logout(response);
}
@Get(':imgpath')
seeUploadedFile(@Param('imgpath') image, @Res() res) {
  return res.sendFile(image, { root: './files' });
}

}
