package com.cinema;

import com.cinema.Utils.Loader;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class HelloApplication extends Application {
    @Override
    public void start(Stage primaryStage) throws IOException {
        Loader loader = new Loader(primaryStage);
        loader.borderPane("SignUp.fxml", null, null, "SignUp");
    }

    public static void main(String[] args) {
        launch();
    }
}