package com.eshosikhi;

import android.app.Application;

import android.content.Context;
import com.facebook.react.PackageList;

import com.facebook.react.ReactApplication;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import java.lang.reflect.InvocationTargetException;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;


import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      // return Arrays.<ReactPackage>asList(
      //       new MainReactPackage(),
            // new CustomWebViewPackage(),
      //       new RNFirebasePackage(),
      //       new RNFirebaseCrashlyticsPackage(),
      //       new RNFirebaseMessagingPackage(),
      //       new RNFirebaseNotificationsPackage(),
      //       new RNExitAppPackage(),
      //       new SvgPackage(),
      //       new ImagePickerPackage(),
      //       new CustomWebViewPackage(),
      //       new RNCWebViewPackage(),
      //       new RNSpinkitPackage(),
      //       new RNGestureHandlerPackage(),
      //       new RNAccountKitPackage(),
      //       new VectorIconsPackage(),
      //       new AsyncStoragePackage()
      // );
      @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          // packages.add(new RNFirebasePackage());
          packages.add(new RNFirebaseCrashlyticsPackage());
          packages.add(new RNFirebaseMessagingPackage());
          packages.add(new RNFirebaseNotificationsPackage());
          // packages.add(new SvgPackage());
          // packages.add(new ImagePickerPackage());
          // packages.add(new RNCWebViewPackage());
          // packages.add(new RNSpinkitPackage());
          // packages.add(new RNGestureHandlerPackage());
          // packages.add(new VectorIconsPackage());
          // packages.add(new VectorIconsPackage());
          // packages.add(new AsyncStoragePackage());
          return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }


  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }


}
