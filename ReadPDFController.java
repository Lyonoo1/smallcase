package com.example.demo.controller;

import com.spire.pdf.PdfDocument;
import com.spire.pdf.PdfPageBase;

import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ReadPDFController {
    public static void main(String[] args){
        ReadPDFController readPdf = new ReadPDFController();
        String date = new SimpleDateFormat("yyyyMMdd-HHmmss").format(new Date());
        String filename = "C:\\Users\\ux018911\\Desktop\\00000fe9-ef94-4b94-a1e1-aaa364dff970_CDF_SparrowOnPrem_FILE~/5b61cfdc-21af-4cb6-a8af-e1e9b12556ce-03030582-00000001-00006978-C@#avis#MCD_RA_FR-PDF.pdf";
        String outFilename = "C:\\Users\\ux018911\\Desktop\\lyon"+date+".txt";
        readPdf.ReadPdfDocument(filename,outFilename);

    }
//读取pdf文件
    public String ReadPdfDocument(String filename,String outFilename){

        //创建pdfDocument实例
        PdfDocument doc = new PdfDocument();


        //加载pdf文件  filename
        doc.loadFromFile(filename);
        StringBuffer sb = new StringBuffer();
        PdfPageBase page;


        //便利pdf页面
        for(int i = 0; i<doc.getPages().getCount();i++){
            page = doc.getPages().get(i);
            String str = page.extractText(true).toString().replace("Evaluation Warning : The document was created with Spire.PDF for Java."," ");
            //System.out.println(i+"--------------------------------------:"+str);
            sb.append(str);
        }

        FileWriter writer;


        try{
            //将文本写入文本文件
            writer = new FileWriter(outFilename);
            writer.write(sb.toString());
            writer.flush();

        } catch (IOException e) {
            e.printStackTrace();
        }
        doc.close();
       return "文件导入成功";
    }
}