module com.cinema {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;
    requires com.dlsc.formsfx;

    opens com.cinema to javafx.fxml;
    exports com.cinema;
}