package edu.slimsider.easybet.repository;

import edu.slimsider.easybet.model.match.Match;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository<M extends Match> extends CrudRepository<M, Long> {



}
