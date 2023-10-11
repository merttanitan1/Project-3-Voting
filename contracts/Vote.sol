// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

contract Vote{
    /*Oy Verme İşlemi:

    Her yetkili kişi, sadece bir kere oy verebilmelidir. --
    Oy verme işlemi için bir fonksiyon sağlanmalıdır. Örneğin, "vote" gibi bir fonksiyon. 

    Adaylar:
    Adaylar için bir liste oluşturulmalıdır. Her adayın bir benzersiz kimlik numarası ve adı olabilir.

    Oy Depolama:
    Verilen oyların saklanabilmesi için bir mekanizma olmalıdır. Örneğin, her aday için bir oy sayacı kullanılabilir.

    Sonuçlar:
    Mevcut oy durumu ve sonuçları görmek için bir fonksiyon sağlanmalıdır.

    Oy Sayımı:
    Oyların güvenli bir şekilde sayılabilmesi için bir fonksiyon veya akıllı kontrat içinde otomatik bir mekanizma olmalıdır.

    Sonuç Bildirimi:
    Sonuçların ilan edilmesi için bir fonksiyon veya olay oluşturulmalıdır.

    Güvenlik:
    Yetkisiz erişimleri önlemek ve oy hırsızlığını engellemek için uygun güvenlik önlemleri alınmalıdır.

    Zaman Sınırları:
    Oy verme süresini ve sonuçların ne zaman açıklanacağını belirlemek için bir zaman sınırlaması eklemek faydalı olabilir.

    Katılımcılar:
    Oy verme işlemine katılan kişilerin listesi ve ayrıntıları saklanmalıdır.*/
    address public owner;

    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    mapping(address => bool) isVoted;
    mapping(uint256 => uint256) voteCount;
    mapping(uint256 => string) public candidates;

    bool isFinished;
    string public winner;
    uint256 candidateCounter;

    function addCandidate(uint256 _candidateId, string memory _name) public onlyOwner{
        require(bytes(candidates[_candidateId]).length == 0, "This Candidate already added.");
        require(isFinished == false, "Votes are finished.");
        require(_candidateId <= candidateCounter, "Out of limit.");
        candidates[_candidateId] = _name;
        candidateCounter++;
    }

    function vote(uint256 _candidateId) public{
        require(isVoted[msg.sender] == false, "You already voted.");
        require(bytes(candidates[_candidateId]).length != 0, "Invalid Candidate.");
        require(isFinished == false, "Votes are finished.");

        voteCount[_candidateId]++;
        isVoted[msg.sender] = true;
    }

    function getResult(uint256 _candidateId) public view returns(uint256){
        return voteCount[_candidateId];
    }

    function announceResult() public onlyOwner{
        require(isFinished == false, "Votes are finished.");

        uint256 winVoteCount = 0;
        uint256 winnerId = 0;

        for(uint256 i = 0; i < candidateCounter; i++){
            if(voteCount[i] > winVoteCount){
                winVoteCount = voteCount[i];
                winnerId = i;
            }
        }

        winner = candidates[winnerId];
        isFinished = true;
    }
}