<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $greetings = array('Hello','welcome','morning');
        $name = "Alex";
        const SURNAME = "Ndemi";
        echo $greetings[rand(0,count($greetings)-1)] . ' everyone' . PHP_EOL;
        echo "<br/>";
        define("FULLNAME",$name . SURNAME);
        echo FULLNAME . PHP_EOL;
        echo "<br/>";
        echo "hello {$name}" . PHP_EOL;
        echo "<br/>";
        var_dump(fdiv(5,0));
        gettype($greetings);
        gettype($greetings);
    ?>
</body>
</html>