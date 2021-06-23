// Created by J. Yun, SCH Univ., yun@sch.ac.kr

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.*;
import java.io.IOException;

public class h_onem2m_get_filter {
	public static void main (String[] args) throws IOException {   
		String[] rname = new String [100];
		String con = null;
		OkHttpClient client = new OkHttpClient().newBuilder().build();
		Request request = new Request.Builder()
				// retrieve latest cin
				.url("http://203.253.128.177:7579/Mobius/sch20175107/dust?fu=1")
				.method("GET", null)
				.addHeader("Accept", "application/json")
				.addHeader("X-M2M-RI", "12345")
				.addHeader("X-M2M-Origin", "SOrigin")
				.build();
		
		try (Response response = client.newCall(request).execute()) {
			String m2m = response.body().string();
			String[] m2mSplit = m2m.split(",");
			for (int i=2; i<m2mSplit.length; i++) {
				String[] lastSplit = m2mSplit[i].split("/");
				rname[i-2] = lastSplit[3].substring(0, 19);
			}
			
		} catch (IOException io) {
			io.printStackTrace(System.out);
		}
		
		for(int i=0; i<rname.length; i++) {
			Request request2 = new Request.Builder()
					.url("http://203.253.128.177:7579/Mobius/sch20175107/dust/"+rname[i])
					.method("GET", null)
					.addHeader("Accept", "application/json")
					.addHeader("X-M2M-RI", "12345")
					.addHeader("X-M2M-Origin", "SOrigin")
					.build();
			
			try (Response response2 = client.newCall(request2).execute()) {
				String m2m = response2.body().string();
				String[] m2mSplit = m2m.split("\"");
				con = m2mSplit[39].toString();
				System.out.println(con);
			} catch (IOException io) {
				io.printStackTrace(System.out);
			} catch (ArrayIndexOutOfBoundsException e) {
				
			}
		}
		System.out.print(con);
	}
}
