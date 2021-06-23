import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.*;
import java.io.IOException;

public class getUsedTable {
	public static String usedTable; //전역변수, 테이블 별 예약 및 사용 정보 표시
	//길이 12, [0]:1번 테이블 예약 여부, [1]:1번 테이블 사용 여부, [2]:2번 테이블 예약 여부, [2]:2번 테이블 사용 여부 등등
	public static int countTable(String tableInfo) {
		int count = 0;
		for(int i=0; i<length(tableInfo); i+=2) {
			if(tableInfo.charAt(i)=='1')
				count++;
		}
		return (6-count);//6개 테이블 중 사용중인 count만큼 제거
	}
	private static int length(String tableInfo) {
		// TODO Auto-generated method stub
		return 0;
	}
	public static void main (String[] args) {   
		
		OkHttpClient client = new OkHttpClient().newBuilder().build();
		Request request = new Request.Builder()
				// retrieve latest cin
				.url("http://203.253.128.177:7579/Mobius/IP-team06/usedTable/la")
				.method("GET", null)
				.addHeader("Accept", "application/json")
				.addHeader("X-M2M-RI", "12345")
				.addHeader("X-M2M-Origin", "SOrigin")
				.build();
				
		try (Response response = client.newCall(request).execute()) {
			if (response.code() != 200) {
				System.out.println("There was a problem. Status Code: " + response.code());
		        return;
			}
			
			JSONObject obj = new JSONObject(response.body().string());
			
			JSONObject o1 = obj.getJSONObject("m2m:cin");
//			System.out.println(o1);
			
			String con = o1.getString("con");
			System.out.println(con);
			usedTable = con;
			postReservedTable.reservedTable = con; // con 값 전달
		} catch (IOException io) {
			io.printStackTrace(System.out);
		}
		
	}
}
