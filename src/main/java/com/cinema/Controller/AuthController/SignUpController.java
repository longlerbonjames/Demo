package com.cinema.Controller.AuthController;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;

public class SignUpController {
    @FXML
    private TextField username;

    @FXML
    private PasswordField password;

    @FXML
    private PasswordField checkPassword;

    @FXML
    private TextField email;


    public void handlerSignUp(ActionEvent event) {
        System.out.println(username.getText());
    }
}
