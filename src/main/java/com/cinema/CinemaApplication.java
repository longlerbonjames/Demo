package com.cinema;

import com.cinema.Utils.Loader;
import javafx.application.Application;
import javafx.stage.Stage;

import java.io.IOException;

public class CinemaApplication extends Application {
    @Override
    public void start(Stage primaryStage) throws IOException {
        Loader loader = new Loader(primaryStage);
        loader.borderPane("Auth", "SignUp.fxml", null, null, "SignUp");
    }

    public static void main(String[] args) {
        launch();
    }
}