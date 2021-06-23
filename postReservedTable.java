import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.MediaType;
import okhttp3.Response;
import org.json.*;
import java.io.IOException;

import java.io.File;//추가
import java.io.FileNotFoundException;//추가
import java.io.FileReader;//추가
import java.io.BufferedReader;//추가


public class postReservedTable { //���� �� ������ ������ ���̺� ����
	public static String reservedTable;
	static String data1;
	static String data2;
	static String data;
	public static void setTable(int tableNum) {
		try{//추가
            //파일 객체 생성
            File file = new File("C:\\Users\\world\\Desktop\\javaprogramming\\FileIO\\Sample.txt");//파일 위치 입력
            //입력 스트림 생성
            FileReader filereader = new FileReader(file);
            BufferedReader bufReader = new BufferedReader(filereader);
            String reservedTable = "";
            while((reservedTable = bufReader.readLine()) != null){
                System.out.println(reservedTable);
            }

            filereader.close();
        }catch (FileNotFoundException e) {
            // TODO: handle exception
        }catch(IOException e){
            System.out.println(e);
        }
		
		if(tableNum==1) { // 6������ ���
			data1 = reservedTable.substring(0,1);//수정
			data2 = reservedTable.substring(2);
			data = data1+"1"+data2;
		}else if(tableNum==2) {
			data1 = reservedTable.substring(0,3);
			data2 = reservedTable.substring(4);
			data = data1+"1"+data2;
		}else if(tableNum==3) {
			data1 = reservedTable.substring(0,5);
			data2 = reservedTable.substring(6);
			data = data1+"1"+data2;
		}else if(tableNum==4) {
			data1 = reservedTable.substring(0,7);
			data2 = reservedTable.substring(8);
			data = data1+"1"+data2;
		}else if(tableNum==5) {
			data1 = reservedTable.substring(0,9);
			data2 = reservedTable.substring(10);
			data = data1+"1"+data2;
		}else if(tableNum==6) {
			data1 = reservedTable.substring(0,11);
			data2 = reservedTable.substring(12);
			data = data1+"1"+data2;
		}else {
			System.out.println("�߸��� �����Դϴ�. ������ 1~6�Դϴ�.");
		}
	}
	public static void main (String[] args) {   

		OkHttpClient client = new OkHttpClient().newBuilder().build();
		
		MediaType mediaType = MediaType.parse("application/vnd.onem2m-res+json; ty=4");
		RequestBody body = RequestBody.create(mediaType, "{\"m2m:cin\": {\"con\": \""+data+"\"}}");
		
		Request request = new Request.Builder()
			.url("http://203.253.128.177:7579/Mobius/IP-team06/usedTable")
			.method("POST", body)
			.addHeader("Accept", "application/json")
			.addHeader("X-M2M-RI", "12345")
			.addHeader("X-M2M-Origin", "SURatAPcSaRq") // aei = change to YOUR aei
			.addHeader("Content-Type", "application/vnd.onem2m-res+json; ty=4")
			.build();
				
		try (Response response = client.newCall(request).execute()) {
			if (response.code() != 201) {
				System.out.println("There was a problem. Status Code: " + response.code());
		        return;
			}
			
			JSONObject obj = new JSONObject(response.body().string());
			
			JSONObject o1 = obj.getJSONObject("m2m:cin");
			System.out.println(o1);
			
			String con = o1.getString("con");
			System.out.println(con);
		} catch (IOException io) {
			io.printStackTrace(System.out);
		}	
	}
}
