/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package <%= settings.packagename %>;

//import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;
import android.view.WindowManager;

public class <%= settings.appname %> extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
    	super.onCreate(savedInstanceState);
    	
    	super.setBooleanProperty("keepRunning", false);
    	
    	
    	getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
    			 WindowManager.LayoutParams.FLAG_FULLSCREEN | 
    			 WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);

    	//super.setIntegerProperty("splashscreen", R.drawable.splash);
    	
      super.loadUrl("file:///android_asset/www/index.html", 10);
        
      //this.appView.getSettings().setJavaScriptEnabled(true);
      //this.appView.addJavascriptInterface(new MyPhoneGap(), "MyPhoneGap");
    }
}

