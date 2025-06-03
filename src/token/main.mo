import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor Token {

    Debug.print("Hello");
    let owner : Principal = Principal.fromText("f6zbe-ifkcy-yaua7-rhnyz-rz7wy-n4bns-7zdzt-yuubd-wsa6n-cefqy-rae");
    let totalSupply : Nat = 2000000000;
    let symbol : Text = "DPRA";

    private stable var balancesEntry : [(Principal, Nat)] = [];

    private var balances : HashMap.HashMap<Principal, Nat> = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };

    // balances.put(owner, totalSupply);

    public query func balanceOf(who : Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared (msg) func payOut() : async Text {

        if (balances.get(msg.caller) == null) {
            let amount : Nat = 10000;
            let result = await transfer(msg.caller, amount);
            return result;
        } else {
            return "Already Claimed";
        };
    };

    public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);

        if (fromBalance >= amount) {
            let newFormBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFormBalance);

            let toBalance = await balanceOf(to);
            let newToBalance : Nat = toBalance + amount;
            balances.put(to, newToBalance);
            return "Success";
        } else {
            return "Insufficient Funds";
        }

    };

    system func preupgrade() {
        balancesEntry := Iter.toArray(balances.entries());
        // backup state before upgrade
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balancesEntry.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
        }
        // restore state after upgrade
    }

};
