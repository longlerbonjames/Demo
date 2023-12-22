package com.cinema.Utils;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

import java.io.IOException;

public class Loader {
    private Stage stage;

    public Loader(Stage stage) {
        this.stage = stage;
    }

    public void borderPane(String path, String view, Integer width, Integer height, String title) throws IOException {
        BorderPane root = new BorderPane();
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/com/cinema/views/" + path + "/" + view));
        Parent fxmlRoot = fxmlLoader.load();
        root.setCenter(fxmlRoot);
        if (width == null || height == null) {
            width = 600;
            height = 600;
        }
        Scene scene = new Scene(root, width, height);
        stage.setTitle(title);
        stage.setScene(scene);
        stage.show();

    }


}
