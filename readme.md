## simple-BookstoreAPI

* front-end written in JavaScript/jQuery
* back-end written in PHP

The API offers basic funcionality such as adding/editting/removing books and authors

In order to test the API please create a db.php configuration file in config directory:

```
<?php
define('DB_HOST','localhost');
define('DB_LOGIN','LOGIN');
define('DB_PASSWORD','PASSWORD');
define('DB_DB','DATABASE_NAME');
```

Next you would like to import the sample database records:

mysql -u username -p database_name < book_workshops.sql




