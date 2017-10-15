package com.studygroup8reactnative.flashlight;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.*;

public class FlashlightModule extends ReactContextBaseJavaModule {
    public FlashlightModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Flashlight";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("TEST", 1);
        return constants;
    }

    @ReactMethod
    public void activate(Callback callback) {
        callback.invoke("success");
    }

    @ReactMethod
    public void deactivate(Callback callback) {
        callback.invoke("success");
    }

    @ReactMethod
    public void check(Callback callback) {
        callback.invoke("success");
    }
}