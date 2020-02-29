<?php

class SaveModel extends BaseModel
{
    public function saveScore($tag,$score)
    {
        var_dump($tag);
        var_dump($score);
        $requete = $this->database->prepare(
            "INSERT INTO `scores` (`id`, `tags`, `score`) 
            VALUES (NULL, :tag, :score)"
        );
        $requete->bindParam(':tag', $tag);
        $requete->bindParam(':score', $score);
        $result = $requete->execute();
        return $result;
    }
}