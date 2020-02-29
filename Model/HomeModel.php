<?php

class HomeModel extends BaseModel
{
    public function listeScores()
    {
        $requete = $this->database->prepare(
            "SELECT scores.tags, scores.score
            FROM scores
            ORDER BY scores.score DESC
            LIMIT 10"
        );
        $requete->execute();
        $list = $requete->fetchAll(PDO::FETCH_NUM);
        return $list;
    }
}
